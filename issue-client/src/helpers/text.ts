export function toInitials(name: string) {
    const words = name.split(' ');
    if(words.length > 1) {
        return words[0][0] + words[1][0];
    }
    return name[0][0];
}

export function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}