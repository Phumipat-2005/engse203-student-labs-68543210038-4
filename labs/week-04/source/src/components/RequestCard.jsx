const statusLabels = {
  pending: "รอดำเนินการ",
  "in-progress": "กำลังดำเนินการ",
  completed: "เสร็จสิ้น",
};

function RequestCard({ request, onDeleteRequest }) {
  return (
    <article className="task-card">
      <div>
        <p className="request-id">{request.id}</p>
        <h3>{request.requestType}</h3>
        <p>
          <strong>ผู้แจ้ง:</strong> {request.requesterName}
        </p>
        <p>
          <strong>สถานที่:</strong> {request.location}
        </p>
        <p>{request.details}</p>
        <div className="badge-row" style={{ marginTop: '0.75rem' }}>
          <span className={`badge status-${request.status}`}>
            {statusLabels[request.status]}
          </span>
          {request.priority === "urgent" && (
            <span className="badge priority-high">เร่งด่วน</span>
          )}
        </div>
      </div>
      <button type="button" className="danger-button" onClick={() => onDeleteRequest(request.id)}>
        ลบ
      </button>
    </article>
  );
}

export default RequestCard;
