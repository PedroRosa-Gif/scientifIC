import { ReactElement } from "react";

interface AuthorizedProps {
	isAuthorized: boolean;
	authorize: ReactElement;
	notAuthorize: ReactElement;
}

function Authorized(props: AuthorizedProps) {
	if (props.isAuthorized)
		return props.authorize;
	
	return props.notAuthorize;
}

export default Authorized;