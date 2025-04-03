var name = "Omkar";

setTimeout(() => {
  const name = "Nath";

  const data = {
    name: "Mandal",
    getName() {
      return this.name;
    },
  };

  console.log(data.getName());
  console.log(data.getName.call(this));
}, 0);
