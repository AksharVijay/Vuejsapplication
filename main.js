new Vue({
  el: "#app",
  data: {
    users: [],
    posts: [],
    post: []
  },
  methods: {
    Showpost(id, i) {
      fetch("https://jsonplaceholder.typicode.com/posts?userId=" + id) //Fetching the data from posts API according to userid
        .then(response => response.json())
        .then(data => {
          console.log(data);
          var tempData = [];
          data.forEach(tempPost => {
            tempPost.open = false;
            tempData.push(tempPost);
          });
          this.post = tempData;
        });
    }
  },
  mounted() {
    fetch("https://jsonplaceholder.typicode.com/users") //Fetching the data from users API
      .then(response => response.json())
      .then(data => {
        this.users = data;
      });
  },
  template: `
<div class="flex">
	<div v-for="user, i in users">
 		<div class="card">
      		<div class="card-section">
    			<button class="btn-primary box" v-on:click="Showpost(user.id, i)" >{{ user.name }}</button>
			</div>
		</div>
  	</div>
	<div class="accordions">
		<dl v-for="p, i in post">
  			<dt v-on:click="p.open = !p.open" >{{ p.title }}</dt>
  				<dd v-if="p.open" >{{ p.body }}</dd>
		</dl>
	</div>
</div>
`
});
