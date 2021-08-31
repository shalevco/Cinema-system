import React, { createContext, useState } from "react";

export const PermissionsContext = createContext();

export const PermissionsContextProvider = (props) => {
	const [permissions, setPermissions] = useState([]);
	return (
		<PermissionsContext.Provider value={[permissions, setPermissions]}>
			{props.children}
		</PermissionsContext.Provider>
	);
};
