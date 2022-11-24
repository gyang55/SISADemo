import React from "react";
import "../../styles/profile.css";
import Tabs from "./Tabs";
import { propTypes } from "react-bootstrap/esm/Image";

/**
 * See HomePage.js for similar comments.
 *  Portfolio
 * @returns
 */

export const Profile = (props) => {
	return (
		<div className="mb-16 w-full">
			<div className="title w-fit">
				<h1 className="text-4xl text-black font-mukta">My Profile</h1>
			</div>
			<div className="flex flex-col gap-10 w-full h-full">
				<Tabs getCache={props.getCache} clearCacheData={props.clearCacheData} putCache={props.putCache}></Tabs>
			</div>
		</div>
	);
};
