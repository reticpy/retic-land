function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function demo() {
  console.log("Hola Valery");
  await sleep(1000);
  console.log("Sabes...");

  // Sleep in loop
  for (let i = 0; i < 7; i++) {
    await sleep(1000);
    console.log("Te quiero!");
  }
  console.log("Y así hasta el infinito y más allá...");
}

demo();
