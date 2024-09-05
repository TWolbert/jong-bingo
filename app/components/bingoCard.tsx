"use client";

import { BingoCardOption } from "@/types";

export function BingoCard() {
    const options: BingoCardOption[] = [];
    for (let i = 1; i <= 25; i++) {
        options.push({
            id: i,
            text: `Option ${i}`
        });
    }

    // Make middle point a 'free' space
    options[12].text = 'Free space';

    function submitOption(option: number) {
        console.log(`Selected option: ${option}`);
     }

    return (
        <div>
            <div className="grid grid-cols-5 gap-2 w-[300px] h-[300px]">
                {options.map((option) => (
                    <button key={option.id} onClick={() => submitOption(options.indexOf(option))} className="border-2 border-gray-200 p-2 text-center">
                        {option.text}
                    </button>
                ))}
            </div>
        </div>
    )
}