/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
    await new Promise(r => setTimeout(r, 4000));
    // const res = await fetch();
    // if (!res.ok) {
    //     // Handle errors if needed
    //     return { data: { message: 'Failed to load data' } };
    // }
    // const data = res.json();
    const tracks = [
        { id: 1, title: "Pictures at an Exhibition (Orch. Ravel) - Promenade I", artist: "Modest Mussorgsky, Wiener Philharmoniker, Gustavo Dudamel", duration: "1:35", durationSeconds: 95, plays: "3,222,104", audioSrc: "/tmp/01 -  Pictures at an Exhibition (Orch. Ravel) - Promenade I.mp3", image: "/mussorgsky.jpg" },
        { id: 2, title: "Pictures at an Exhibition (Orch. Ravel) - I. Gnomus", artist: "Modest Mussorgsky, Wiener Philharmoniker, Gustavo Dudamel", duration: "2:12", durationSeconds: 132, plays: "1,182,565", audioSrc: "/tmp/02 - Pictures at an Exhibition (Orch. Ravel) - I. Gnomus.mp3", image: "/mussorgsky.jpg" },
        { id: 3, title: "Pictures at an Exhibition (Orch. Ravel) - Promenade II", artist: "Modest Mussorgsky, Wiener Philharmoniker, Gustavo Dudamel", duration: "0:55", durationSeconds: 55, plays: "3,508,122", audioSrc: "/tmp/03 - Pictures at an Exhibition (Orch. Ravel) - Promenade II.mp3", image: "/mussorgsky.jpg" },
        { id: 4, title: "Pictures at an Exhibition (Orch. Ravel) - II. The Old Castle", artist: "Modest Mussorgsky, Wiener Philharmoniker, Gustavo Dudamel", duration: "4:23", durationSeconds: 263, plays: "1,261,157", audioSrc: "/tmp/04 - Pictures at an Exhibition (Orch. Ravel) - II. The Old Castle.mp3", image: "/mussorgsky.jpg" },
        { id: 5, title: "Pictures at an Exhibition (Orch. Ravel) - Promenade III", artist: "Modest Mussorgsky, Wiener Philharmoniker, Gustavo Dudamel", duration: "0:29", durationSeconds: 29, plays: "7,651", audioSrc: "/tmp/05 - Pictures at an Exhibition (Orch. Ravel) - Promenade III.mp3", image: "/mussorgsky.jpg" },
        { id: 6, title: "Pictures at an Exhibition (Orch. Ravel) - III. Tuileries Gardens", artist: "Modest Mussorgsky, Wiener Philharmoniker, Gustavo Dudamel", duration: "1:26", durationSeconds: 86, plays: "1,296,036", audioSrc: "/tmp/06 - Pictures at an Exhibition (Orch. Ravel) - III. Tuileries Gardens.mp3", image: "/mussorgsky.jpg" },
        { id: 7, title: "Pictures at an Exhibition (Orch. Ravel) - IV. Bydlo", artist: "Modest Mussorgsky, Wiener Philharmoniker, Gustavo Dudamel", duration: "3:15", durationSeconds: 195, plays: "2,104,321", audioSrc: "/tmp/07 - Pictures at an Exhibition (Orch. Ravel) - IV. Bydlo.mp3", image: "/mussorgsky.jpg" },
        { id: 8, title: "Pictures at an Exhibition (Orch. Ravel) - Promenade IV", artist: "Modest Mussorgsky, Wiener Philharmoniker, Gustavo Dudamel", duration: "1:10", durationSeconds: 70, plays: "1,654,321", audioSrc: "/tmp/08 - Pictures at an Exhibition (Orch. Ravel) - Promenade IV.mp3", image: "/mussorgsky.jpg" },
        { id: 9, title: "Pictures at an Exhibition (Orch. Ravel) - V. Ballet of the Unhatched Chicks", artist: "Modest Mussorgsky, Wiener Philharmoniker, Gustavo Dudamel", duration: "1:45", durationSeconds: 105, plays: "1,234,567", audioSrc: "/tmp/09 - Pictures at an Exhibition (Orch. Ravel) - V. Ballet of the Unhatched Chicks.mp3", image: "/mussorgsky.jpg" },
        { id: 10, title: "Pictures at an Exhibition (Orch. Ravel) - VI. Samuel Goldenberg and Schmuÿle", artist: "Modest Mussorgsky, Wiener Philharmoniker, Gustavo Dudamel", duration: "2:30", durationSeconds: 150, plays: "987,654", audioSrc: "/tmp/10 - Pictures at an Exhibition (Orch. Ravel) - VI. Samuel Goldenberg und Schmuÿle.mp3", image: "/mussorgsky.jpg" },
        { id: 11, title: "Pictures at an Exhibition (Orch. Ravel) - VII. The Market at Limoges", artist: "Modest Mussorgsky, Wiener Philharmoniker, Gustavo Dudamel", duration: "1:30", durationSeconds: 90, plays: "765,432", audioSrc: "/tmp/11 - Pictures at an Exhibition (Orch. Ravel) - VII. The Market at Limoges.mp3", image: "/mussorgsky.jpg" },
        { id: 12, title: "Pictures at an Exhibition (Orch. Ravel) - VIIIa. Catacombae (Sepulchrum Romanum)", artist: "Modest Mussorgsky, Wiener Philharmoniker, Gustavo Dudamel", duration: "2:45", durationSeconds: 165, plays: "654,321", audioSrc: "/tmp/12 - Pictures at an Exhibition (Orch. Ravel) - VIIIa. Catacombae (Sepulchrum Romanum).mp3", image: "/mussorgsky.jpg" },
        { id: 13, title: "Pictures at an Exhibition (Orch. Ravel) - IX. The Hut on Chicken's Legs", artist: "Modest Mussorgsky, Wiener Philharmoniker, Gustavo Dudamel", duration: "3:50", durationSeconds: 230, plays: "543,210", audioSrc: "/tmp/14 - Pictures at an Exhibition (Orch. Ravel) - IX. The Hut on Chicken's Legs.mp3", image: "/mussorgsky.jpg" },
        { id: 14, title: "Pictures at an Exhibition (Orch. Ravel) - X. The Great Gate of Kiev", artist: "Modest Mussorgsky, Wiener Philharmoniker, Gustavo Dudamel", duration: "5:10", durationSeconds: 310, plays: "432,109", audioSrc: "/tmp/15 - Pictures at an Exhibition (Orch. Ravel) - X. The Great Gate of Kiev.mp3", image: "/mussorgsky.jpg" },
        { id: 15, title: "Mussorgsky Night on Bald Mountain", artist: "Modest Mussorgsky, Wiener Philharmoniker, Gustavo Dudamel", duration: "4:00", durationSeconds: 240, plays: "321,098", audioSrc: "/tmp/Mussorgsky Night on Bald Mountain.mp3", image: "/mussorgsky.jpg" },
        { id: 16, title: "Swan Lake Suite, Op. 20a II. Waltz", artist: "Modest Mussorgsky, Wiener Philharmoniker, Gustavo Dudamel", duration: "3:20", durationSeconds: 200, plays: "210,987", audioSrc: "/tmp/Swan Lake Suite, Op. 20a II. Waltz.mp3", image: "/mussorgsky.jpg" }
    ];

    const data = {
        id: "mussorgsky-pictures",
        title: "Mussorgsky: Pictures At An Exhibition",
        artist: "Modest Mussorgsky • Wiener Philharmoniker • Gustavo Dudamel • Pyotr Ilyich Tchaikovsky",
        year: 2016,
        imageUrl: "/sample.jpg",
        detailsLine: "Modest Mussorgsky • Wiener Philharmoniker • Gustavo Dudamel • Pyotr Ilyich Tchaikovsky • 2016 • 17 songs, 50 min 49 sec", // From image
        tracks: tracks,
    }

    return Promise.resolve(data);
}