import { useEffect, useState } from "react";
import "../styles/Notifier.css";

interface INotifier {
    show: boolean;
    setShow: (b: boolean) => void;
    notifications: string[]
}

function Notifier(props: INotifier) {
    const [showNotifications, setShowNotifications] = useState<boolean>();

    useEffect(() => {
        setShowNotifications(props.show);
    }, [props.show]);

    useEffect(() => {
        if (showNotifications)
            setTimeout(function () {
                setShowNotifications(false);
                props.setShow(false);
            }, 3000);
    }, [showNotifications]);

    return (
        <div className="toast-notification">
            <h3>Notificações</h3>
            <ul>
                {props.notifications.map((notification, index) => 
                    <li key={notification + index}>{notification}</li>
                )}
            </ul>
        </div>
    );
}

export default Notifier;