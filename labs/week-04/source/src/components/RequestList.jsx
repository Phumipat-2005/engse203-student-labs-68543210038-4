import RequestCard from "./RequestCard.jsx";

function RequestList({ requests, onDeleteRequest }) {
  if (requests.length === 0) {
    return (
      <div className="empty-state" role="status">
        ยังไม่มีคำร้องสำหรับสถานะที่เลือก
      </div>
    );
  }

  return (
    <div className="task-list">
      {requests.map((request) => (
        <RequestCard
          key={request.id}
          request={request}
          onDeleteRequest={onDeleteRequest}
        />
      ))}
    </div>
  );
}

export default RequestList;
