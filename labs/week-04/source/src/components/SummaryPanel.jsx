const summaryItems = [
  ["total", "ทั้งหมด"],
  ["pending", "รอดำเนินการ"],
  ["in-progress", "กำลังดำเนินการ"],
  ["completed", "เสร็จสิ้น"],
];

function SummaryPanel({ summary }) {
  return (
    <section className="summary-grid" aria-label="สรุปจำนวนคำร้อง">
      {summaryItems.map(([key, label]) => (
        <article className="summary-card" key={key}>
          <span>{label}</span>
          <strong>{summary[key]}</strong>
        </article>
      ))}
    </section>
  );
}

export default SummaryPanel;
