import { useEffect, useState } from "react";
import "../styles/Notifier.css";

interface INotifier {
	show: boolean;
	setShow: (b: boolean) => void;
	notifications: string[]
}

function Notifier({ show, setShow, ...props}: INotifier) {
	const [showNotifications, setShowNotifications] = useState<boolean>();

	useEffect(() => {
		setShowNotifications(show);
	}, [show]); 

	useEffect(() => {
		if (showNotifications)
			setTimeout(function () {
				setShowNotifications(false);
				setShow(false);
			}, 5000);
	}, [showNotifications, setShow]);

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