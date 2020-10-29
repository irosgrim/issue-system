export function toInitials(name: string) {
    const words = name.split(' ');
    if(words.length > 1) {
        return words[0][0] + words[1][0];
    }
    return name[0];
}

export function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

export function copyToClipboard(text: string){
    if (navigator.clipboard) {
        return navigator.clipboard.writeText(text);
      } else {
        const input = document.createElement("input");
        input.style.display = 'none';
        document.body.appendChild(input);
        input.value = text;
        input.focus();
        input.select();
        document.execCommand('copy');
        input.remove();
        return Promise.resolve();
      }
}