// import someObject from '../projectsData.json';
// console.log(someObject)
const loadedProjects = [];

$(document).ready(function () {

    let html = "";
    $.getJSON("projectsData.json", function (data) {
        console.log(data)
        $.each(data, function (index, project) {
            loadedProjects.push(project);
            html += parseHTML(project, index);
        });
        document.getElementById("projectsList").innerHTML = html;
    });

});


function parseHTML(project, index) {
    const hasWebsite = project.siteUrl == "#" ? "disabled" : "";
    const hasSource = project.sourceUrl == "#" ? "disabled" : "";

    return `
			<article anim="fadeInRight" animateOn="#projects" style="animation-delay: ${0.5 + (0.2 * index)}s;" class="col-12 col-md-6 col-xl-4 mt-4 animated hide-anim">
				<div class="card shadow h-100 mt-5">
					<img src="${project.img}" alt="${project.name}" class="card-img-top" onclick="onCardClick(${index})">
					<div class="card-body d-flex flex-column">
						<h2 class="card-title">${project.name}</h2>
						<div class="card-text">
							<p>
								${project.text}
							</p>
						</div>
						<div class="pl-4 mt-auto">
							<a href="${project.sourceUrl}" target="_blank">
								<button class="btn btn-info left-rounded" ${hasSource}>
									Source Code
								</button>
							</a>
							<a href="${project.siteUrl}" target="_blank">
								<button class="btn btn-info ml-n2 right-rounded" ${hasWebsite}>
									View Website
								</button>
							</a>
						</div>
					</div>
				</div>
			</article>

    `;

};

function onCardClick(index) {
    const { name, img, text, sourceUrl, siteUrl, stack } = loadedProjects[index];
    let stackHtml = "";
    for (let i = 0; i < stack.length; i++) {
        if (i !== 0) {
            stackHtml += ", ";
        }
        stackHtml += `${stack[i]}`;
    }
    $("#cardModal").modal("show");
    $("#cardModal #modalHeader").html(name);
    $("#cardModal #modalText").html(text);
    $("#cardModal #modalImg").attr("src", img);
    $("#cardModal #modalSource").attr("href", sourceUrl);
    $("#cardModal #modalWebsite").attr("href", siteUrl);
    $("#cardModal #keywords").html(stackHtml);
}


