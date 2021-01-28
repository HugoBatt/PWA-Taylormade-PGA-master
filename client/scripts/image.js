window.onload = function () {
	Promise.resolve(imagePaths).then(resImagePaths => {
		resImagePaths.forEach((imagePath, index) => {
			const imageAffiche = document.createElement("a");
			const boutonFavoris = document.createElement('button');
			const galleryImage = document.createElement('div');
			const imgHolder = document.createElement('div');

			imageAffiche.classList.add("full");
			imageAffiche.classList.add("progressive");
			imageAffiche.classList.add("replace");
			imageAffiche.setAttribute("href", imagePath);
			imageAffiche.innerHTML = `<img src="${imagePath[0]}" class="preview" loading="lazy" width="20" height="15" alt="preview"/>`

			boutonFavoris.innerHTML = '☆';
			boutonFavoris.classList.add("img");
			boutonFavoris.classList.add("rounded-circle");
			boutonFavoris.setAttribute("id", `${imagePath[0]}`);
			boutonFavoris.addEventListener("click", () => {
				if(boutonFavoris=='☆') {
					boutonFavoris.innerHTML = '★';
					fetch(`http://localhost:3000/favorite?image=${encodeURIComponent(imagePath[0])}`)
						.then((response) => {
							navigator.serviceWorker.ready.then(
								(serviceWorkerRegistration) => {
									serviceWorkerRegistration.pushManager.subscribe(
										{
											userVisibleOnly: true,
											applicationServerKey: "BNANPi8bmsrs4-wBjl_Et7dDewZWSHjYKKZuoDvZai1fvnhS282gY_PdYl38DXs4pS-FORfya5jkOs1dMkjpTHY"
										}
									).then(_subscription => {
										Notification.requestPermission(permission => {
											if (permission === "granted") {
												const notification = new Notification("Ajouté aux favoris");
											}
										});
									});
								}
							);
						})
						.catch(console.error);
				}
				else{
					boutonFavoris.innerHTML = '☆';
					fetch(`http://localhost:3000/favorite?image=${encodeURIComponent(imagePath[0])}`)
						.then((response) => {
							navigator.serviceWorker.ready.then(
								(serviceWorkerRegistration) => {
									serviceWorkerRegistration.pushManager.subscribe(
										{
											userVisibleOnly: true,
											applicationServerKey: "BNANPi8bmsrs4-wBjl_Et7dDewZWSHjYKKZuoDvZai1fvnhS282gY_PdYl38DXs4pS-FORfya5jkOs1dMkjpTHY"
										}
									).then(_subscription => {
										Notification.requestPermission(permission => {
											if (permission === "granted") {
												const notification = new Notification("Supprimé des favoris");
											}
										});
									});
								}
							);
						})
						.catch(console.error);
				}

			})

			imgHolder.classList.add("img-holder");
			imgHolder.append(imageAffiche);
			imgHolder.append(boutonFavoris);

			galleryImage.classList.add("gallery-image");
			galleryImage.append(imgHolder);

			document.getElementById("gallery").appendChild(galleryImage);


		})
	})
		.catch(err => {
			const messageElement = document.createElement("p");
			messageElement.innerText = err;
			document.getElementById("gallery").appendChild(messageElement)
		})
};
