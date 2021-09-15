import React from "react";

const PlyContent = ({ ply, withEmoji }) => {
	return withEmoji && !ply.isPawn ?
		<>
			<span className="emoji-ply">{ply.emoji.substr(0, 1)}</span>{ply.emoji.substr(1)}
		</> :
		ply.normal;
};

export default PlyContent;
