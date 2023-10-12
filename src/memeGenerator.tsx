import { useState } from "react";

function MemeGenerator() {
	const [image, setImage] = useState("");

	const generateRandomMeme = () => {
		fetch("https://api.imgflip.com/get_memes", {
			method: "GET",
		})
			.then((response) => response.json())
			.then((data) => {
				if (data.success) {
					const randomMeme =
						data.data.memes[Math.floor(Math.random() * data.data.memes.length)];
					setImage(randomMeme.url);
				} else {
					console.log("Failed to generate meme:", data.error_message);
				}
			})
			.catch((error) => {
				console.log("Error:", error);
			});
	};

	return (
		<div>
			<button onClick={generateRandomMeme}>Generate Random Meme</button>
			{image && (
				<div className="image-wrapper">
					<img src={image} alt="Meme" />
				</div>
			)}
		</div>
	);
}

export default MemeGenerator;
