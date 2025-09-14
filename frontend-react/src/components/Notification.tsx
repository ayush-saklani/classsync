import { useNotificationStore } from '@/store/notificationStore';
import { useEffect } from 'react';

export default function Notification() {
  const { notifications, removeNotification } = useNotificationStore();

  useEffect(() => {
    const interval = setInterval(() => {
      if (notifications.length > 0) {
        removeNotification(notifications[0].id);
      }
    }, 7000);

    return () => clearInterval(interval);
  }, [notifications, removeNotification]);

  return (
    <div className="position-fixed bottom-0 end-0 m-3" style={{ zIndex: 1000 }}>
      {notifications.map(notification => (
        <div key={notification.id} className={`card text-bg-${notification.color} bottom-0 end-0 me-3 mt-1`}>
          <div className="card-header fw-bold py-1">
            <span>
              {notification.color === 'success' && <i className="bi bi-check-circle-fill"></i>}
              {notification.color === 'danger' && <i className="bi bi-exclamation-triangle-fill"></i>}
              {notification.color === 'warning' && <i className="bi bi-exclamation-octagon-fill"></i>}
              {notification.color === 'info' && <i className="bi bi-info-circle-fill"></i>}
              {notification.color === 'primary' && <i className="bi bi-info-circle-fill"></i>}
              {notification.title}
            </span>
            <button className="btn float-end p-0 m-0 card-header" onClick={() => removeNotification(notification.id)}>
              <i className="bi bi-x-circle h5"></i>
            </button>
          </div>
          {notification.description && (
            <div className="card-body py-2">
              <p className="card-text">{notification.description}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
