import Person from './Person';
import BaseUrl from './BaseUrl';
// Template
import titleTemplate from '../template/title.handlebars';

// let p = new Person('张三', 20);
// document.write(p.say());
// document.write(p.action());
// let currentRequest='http://localhost:8080/monitor';  //document.location.href
// let bUrl = new BaseUrl(currentRequest);
// document.write("</br>"+bUrl.parseHost()+bUrl.parseApp());

document.addEventListener("DOMContentLoaded", function() {
	var div = document.createElement('div');
	div.innerHTML = titleTemplate({
		username: "test",
		books: [
			{ title: "A book", synopsis: "With a description" },
			{ title: "Another book", synopsis: "From a very good author" },
			{ title: "Book without synopsis" }
		]
	});
	document.body.appendChild(div);
});
