function sleep(ms) {
    return new Promise(
        resolve => setTimeout(resolve, ms)
    );
}

async function TKB() {
    const div = document.createElement('div');
    const h1 = document.createElement('h1');
    
    div.className = 'main';
    document.body.appendChild(div);
    div.appendChild(h1);

    for (let i = 0; i < 10; i++) {
        const h1Text = document.createTextNode('Hll Webpack-Babel-Boilerplate!' + i);
        h1.appendChild(h1Text);
        await sleep(1000)
    }
}
export default TKB;