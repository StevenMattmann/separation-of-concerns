export type MontyHallResult = {
    totalGames: number;
    stayWins: number;
    switchWins: number;
    stayWinRate: number;
    switchWinRate: number;
};

type RandomIntFn = (maxExclusive: number) => number;

const defaultRandomInt: RandomIntFn = (maxExclusive: number): number =>
    Math.floor(Math.random() * maxExclusive);

function playSingleGame(randomInt: RandomIntFn): { stayWin: boolean; switchWin: boolean } {
    const doors = [0, 1, 2];

    const carDoor = randomInt(3);

    const initialChoice = randomInt(3);

    const possibleHostDoors = doors.filter(
        (door) => door !== carDoor && door !== initialChoice,
    );

    const hostDoor =
        possibleHostDoors.length === 1
            ? possibleHostDoors[0]
            : possibleHostDoors[randomInt(possibleHostDoors.length)];

    const remainingDoor = doors.find(
        (door) => door !== initialChoice && door !== hostDoor,
    ) as number;

    const stayWin = initialChoice === carDoor;
    const switchWin = remainingDoor === carDoor;

    return { stayWin, switchWin };
}

export function simulateMontyHall(
    totalGames: number,
    randomInt: RandomIntFn = defaultRandomInt,
): MontyHallResult {
    if (totalGames < 0 || !Number.isInteger(totalGames)) {
        throw new Error("totalGames must be a non-negative integer");
    }

    let stayWins = 0;
    let switchWins = 0;

    for (let i = 0; i < totalGames; i++) {
        const { stayWin, switchWin } = playSingleGame(randomInt);
        if (stayWin) stayWins++;
        if (switchWin) switchWins++;
    }

    const stayWinRate = totalGames === 0 ? 0 : stayWins / totalGames;
    const switchWinRate = totalGames === 0 ? 0 : switchWins / totalGames;

    return {
        totalGames,
        stayWins,
        switchWins,
        stayWinRate,
        switchWinRate,
    };
}

export function play(totalGames: number): void {
    const result = simulateMontyHall(totalGames);

    console.log(`Monty-Hall-Simulation mit ${result.totalGames} Spielen:`);
    console.log(`- Gewinn, wenn man bei der Wahl bleibt:`);
    console.log(
        `  ${result.stayWins} Siege (${(result.stayWinRate * 100).toFixed(2)} %)`,
    );
    console.log(`- Gewinn, wenn man die Wahl wechselt:`);
    console.log(
        `  ${result.switchWins} Siege (${(result.switchWinRate * 100).toFixed(2)} %)`,
    );
}
