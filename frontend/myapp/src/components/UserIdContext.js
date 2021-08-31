import React, { createContext, useState } from "react";

export const IdContext = createContext();

export const IdContextProvider = (props) => {
	const [id, setId] = useState("");
	return (
		<IdContext.Provider value={[id, setId]}>
			{props.children}
		</IdContext.Provider>
	);
};
