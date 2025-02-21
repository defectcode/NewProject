// total.js

// Глобальный массив для хранения транзакций (только для демонстрации)
let transactions = [];

export default async function handler(req, res) {
  // Обработка POST-запроса – получение вебхука от Stripe
  if (req.method === 'POST') {
    let event;
    try {
      // Для проверки подписи вебхука можно использовать stripe.webhooks.constructEvent,
      // здесь опустим эту часть для простоты
      event = req.body; 
    } catch (err) {
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Обрабатываем событие успешной сессии
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      if (session.payment_status === 'paid') {
        // Сохраняем данные транзакции, включая метаданные, где хранится plink
        transactions.push({
          id: session.id,
          amount_total: session.amount_total, // сумма в центах
          plink: session.metadata.payment_link_id, // предполагается, что plink передаётся в metadata
          created: session.created,
        });
      }
    }
    // Можно обработать и другие типы событий, если требуется

    return res.status(200).json({ received: true });
  }
  
  // Обработка GET-запроса – отдача данных для прогресса на фронтенде
  if (req.method === 'GET') {
    const { paymentLinkId } = req.query;
    if (!paymentLinkId) {
      return res.status(400).json({ error: 'Payment Link ID is required' });
    }
    
    // Фильтруем транзакции по paymentLinkId (то же, что и plink)
    const filteredTransactions = transactions.filter(tx => 
      tx.plink && tx.plink.trim() === paymentLinkId.trim()
    );
    
    // Расчёт общей суммы (переводим из центов в доллары)
    const totalRaised = filteredTransactions.reduce((acc, tx) => acc + (tx.amount_total || 0), 0) / 100;
    const totalTransactions = filteredTransactions.length;
    
    // Берём значение plink из первой найденной транзакции (если необходимо)
    const plink = filteredTransactions.length > 0 ? filteredTransactions[0].plink : null;
    
    return res.status(200).json({ totalRaised, totalTransactions, plink });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}