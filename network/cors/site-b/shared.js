fetch("http://a.com:90/hello").then((res) => res.json()).then(data => {
    console.log(data);
})
