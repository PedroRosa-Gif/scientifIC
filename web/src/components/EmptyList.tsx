import "../styles/Empty.css";

interface IEmptyList {
	message: string;
}

function EmptyList({ message }: IEmptyList) {
	return (
		<div className="empty-list">
			{message}
		</div>
	);
}

export default EmptyList;