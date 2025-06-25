// FAQ component

function FAQ({ faqs }) {
  return (
    <div style={{ margin: '32px 0' }}>
      <h2>FAQ</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {faqs && faqs.map((faq, i) => (
          <li key={i} style={{ marginBottom: 16 }}>
            <strong>{faq.q}</strong>
            <div style={{ color: '#555' }}>{faq.a}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FAQ; 