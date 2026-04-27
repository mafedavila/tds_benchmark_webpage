import { useEffect, useMemo, useRef, useState, type KeyboardEvent, type MouseEvent } from "react";

interface CoinBudgetProps {
    options: { id: string; label: string; description: string }[];
    budget: Record<string, number>;
    onChange: (budget: Record<string, number>) => void;
}

const TOTAL_COINS = 10;

const clampCoinValue = (value: number, max = TOTAL_COINS) => {
    if (!Number.isFinite(value)) {
        return 0;
    }

    return Math.min(Math.max(Math.trunc(value), 0), max);
};

function animateCoin(sourceEl: HTMLElement, targetEl: HTMLElement, onComplete: () => void) {
    const from = sourceEl.getBoundingClientRect();
    const to = targetEl.getBoundingClientRect();
    const floater = document.createElement("div");

    floater.style.cssText = `
        position: fixed; width: 32px; height: 32px; border-radius: 50%;
        background: #F59E0B; top: ${from.top}px; left: ${from.left}px;
        pointer-events: none; z-index: 9999; transition: none;
        box-shadow: inset 0 0 0 3px rgba(255,255,255,0.35), 0 10px 20px rgba(245,158,11,0.25);
    `;
    document.body.appendChild(floater);
    floater.animate(
        [
            { transform: "translate(0,0) scale(1)" },
            {
                transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(0.875)`,
            },
        ],
        {
            duration: 400,
            easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            fill: "forwards",
        },
    );
    setTimeout(() => {
        floater.remove();
        onComplete();
    }, 420);
}

export default function CoinBudget({ options, budget, onChange }: CoinBudgetProps) {
    const bankSlotRefs = useRef<Array<HTMLButtonElement | null>>([]);
    const traySlotRefs = useRef<Record<string, HTMLElement | null>>({});
    const [selectedBankSlot, setSelectedBankSlot] = useState<number | null>(null);
    const [animatingSlots, setAnimatingSlots] = useState<Set<string>>(new Set());
    const [shakingOption, setShakingOption] = useState<string | null>(null);

    const normalizedBudget = useMemo(
        () =>
            options.reduce<Record<string, number>>((acc, option) => {
                const currentTotal = Object.values(acc).reduce((sum, value) => sum + value, 0);
                const availableCoins = TOTAL_COINS - currentTotal;

                acc[option.id] = clampCoinValue(budget[option.id] ?? 0, availableCoins);

                return acc;
            }, {}),
        [budget, options],
    );

    const totalAllocated = Object.values(normalizedBudget).reduce((sum, value) => sum + value, 0);
    const coinsRemaining = TOTAL_COINS - totalAllocated;
    const isAnimating = animatingSlots.size > 0;

    useEffect(() => {
        if (selectedBankSlot !== null && selectedBankSlot >= coinsRemaining) {
            setSelectedBankSlot(null);
        }
    }, [coinsRemaining, selectedBankSlot]);

    const setTraySlotRef = (slotKey: string, element: HTMLElement | null) => {
        traySlotRefs.current[slotKey] = element;
    };

    const addAnimatingSlots = (slotKeys: string[]) => {
        setAnimatingSlots((currentSlots) => new Set([...currentSlots, ...slotKeys]));
    };

    const removeAnimatingSlots = (slotKeys: string[]) => {
        setAnimatingSlots((currentSlots) => {
            const nextSlots = new Set(currentSlots);

            slotKeys.forEach((slotKey) => nextSlots.delete(slotKey));

            return nextSlots;
        });
    };

    const updateBudget = (optionId: string, nextValue: number) => {
        const otherOptionsTotal = options.reduce((sum, option) => {
            if (option.id === optionId) {
                return sum;
            }

            return sum + (normalizedBudget[option.id] ?? 0);
        }, 0);
        const maxForOption = TOTAL_COINS - otherOptionsTotal;

        onChange({
            ...normalizedBudget,
            [optionId]: clampCoinValue(nextValue, maxForOption),
        });
    };

    const shakeContainer = (optionId: string) => {
        setShakingOption(optionId);
        setTimeout(() => setShakingOption(null), 320);
    };

    const handleBankCoinClick = (slotIndex: number) => {
        if (isAnimating || slotIndex >= coinsRemaining) {
            return;
        }

        setSelectedBankSlot(slotIndex);
    };

    const handleContainerClick = (optionId: string) => {
        if (isAnimating || selectedBankSlot === null) {
            return;
        }

        const allocatedCoins = normalizedBudget[optionId] ?? 0;

        if (allocatedCoins >= TOTAL_COINS) {
            shakeContainer(optionId);
            return;
        }

        const sourceEl = bankSlotRefs.current[selectedBankSlot];
        const targetSlotKey = `tray-${optionId}-${allocatedCoins}`;
        const targetEl = traySlotRefs.current[targetSlotKey];

        if (!sourceEl || !targetEl) {
            updateBudget(optionId, allocatedCoins + 1);
            setSelectedBankSlot(null);
            return;
        }

        const sourceSlotKey = `bank-${selectedBankSlot}`;
        const hiddenSlots = [sourceSlotKey, targetSlotKey];

        addAnimatingSlots(hiddenSlots);
        animateCoin(sourceEl, targetEl, () => {
            updateBudget(optionId, allocatedCoins + 1);
            setSelectedBankSlot(null);
            removeAnimatingSlots(hiddenSlots);
        });
    };

    const handleAllocatedCoinClick = (
        event: MouseEvent<HTMLButtonElement>,
        optionId: string,
        coinIndex: number,
    ) => {
        event.stopPropagation();

        if (isAnimating) {
            return;
        }

        const allocatedCoins = normalizedBudget[optionId] ?? 0;
        const sourceSlotKey = `tray-${optionId}-${coinIndex}`;
        const targetSlotKey = `bank-${coinsRemaining}`;
        const sourceEl = traySlotRefs.current[sourceSlotKey];
        const targetEl = bankSlotRefs.current[coinsRemaining];

        if (!sourceEl || !targetEl) {
            updateBudget(optionId, allocatedCoins - 1);
            return;
        }

        const hiddenSlots = [sourceSlotKey, targetSlotKey];

        addAnimatingSlots(hiddenSlots);
        setSelectedBankSlot(null);
        animateCoin(sourceEl, targetEl, () => {
            updateBudget(optionId, allocatedCoins - 1);
            removeAnimatingSlots(hiddenSlots);
        });
    };

    const handleContainerKeyDown = (event: KeyboardEvent<HTMLDivElement>, optionId: string) => {
        if (event.key !== "Enter" && event.key !== " ") {
            return;
        }

        event.preventDefault();
        handleContainerClick(optionId);
    };

    return (
        <div className="space-y-4">
            <style>
                {`
                    @keyframes pulse-glow {
                        0%, 100% { box-shadow: inset 0 0 0 3px rgba(255,255,255,0.35), 0 0 0 0 rgba(245,158,11,0.45); }
                        50% { box-shadow: inset 0 0 0 3px rgba(255,255,255,0.45), 0 0 0 10px rgba(245,158,11,0); }
                    }

                    @keyframes shake-container {
                        0%, 100% { transform: translateX(0); }
                        20%, 60% { transform: translateX(-0.35rem); }
                        40%, 80% { transform: translateX(0.35rem); }
                    }
                `}
            </style>

            <div className="rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                        <h3 className="text-sm font-bold text-gray-900">Coin bank</h3>
                        <p className="text-xs text-gray-500">Select a coin, then click a purpose card.</p>
                    </div>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-amber-700 shadow-sm">
                        {coinsRemaining} available
                    </span>
                </div>

                <div className="flex flex-wrap gap-2">
                    {Array.from({ length: TOTAL_COINS }, (_, index) => {
                        const isAvailable = index < coinsRemaining;
                        const isSelected = selectedBankSlot === index;
                        const isHidden = animatingSlots.has(`bank-${index}`);

                        return (
                            <button
                                key={`bank-${index}`}
                                ref={(element) => {
                                    bankSlotRefs.current[index] = element;
                                }}
                                type="button"
                                onClick={() => handleBankCoinClick(index)}
                                disabled={!isAvailable || isAnimating}
                                aria-label={
                                    isAvailable
                                        ? `Select unallocated coin ${index + 1}`
                                        : `Allocated coin slot ${index + 1}`
                                }
                                aria-pressed={isSelected}
                                className={`h-8 w-8 rounded-full transition ${
                                    isHidden
                                        ? "opacity-0"
                                        : isAvailable
                                          ? "border border-amber-500 bg-amber-400 hover:bg-amber-500"
                                          : "border-2 border-dashed border-gray-300 bg-transparent"
                                } ${
                                    isAvailable
                                        ? "shadow-[inset_0_0_0_3px_rgba(255,255,255,0.35)]"
                                        : ""
                                } ${isSelected ? "animate-[pulse-glow_1s_ease-in-out_infinite]" : ""}`}
                            />
                        );
                    })}
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 xl:grid-cols-5">
                {options.map((option) => {
                    const allocatedCoins = normalizedBudget[option.id] ?? 0;
                    const canReceiveCoin = selectedBankSlot !== null && !isAnimating;
                    const purposeInitial = option.label.trim().charAt(0).toUpperCase();

                    return (
                        <div
                            key={option.id}
                            role="button"
                            tabIndex={0}
                            onClick={() => handleContainerClick(option.id)}
                            onKeyDown={(event) => handleContainerKeyDown(event, option.id)}
                            className={`relative flex min-h-56 flex-col justify-between rounded-2xl border bg-white p-3 text-left shadow-sm transition sm:p-4 ${
                                canReceiveCoin
                                    ? "border-amber-300 ring-2 ring-amber-100 hover:border-amber-500"
                                    : "border-gray-200 hover:border-gray-300"
                            } ${
                                shakingOption === option.id
                                    ? "animate-[shake-container_300ms_ease-in-out]"
                                    : ""
                            }`}
                        >
                            <span className="absolute right-3 top-3 rounded-full bg-gray-100 px-2.5 py-1 text-xs font-bold text-gray-700">
                                {allocatedCoins} / {TOTAL_COINS}
                            </span>

                            <span className="pr-14">
                                <span className="block text-sm font-bold text-gray-900">{option.label}</span>
                                <span className="mt-1 block text-xs leading-5 text-gray-500">
                                    {option.description}
                                </span>
                            </span>

                            <span className="mt-4 grid grid-cols-5 gap-1.5">
                                {Array.from({ length: TOTAL_COINS }, (_, index) => {
                                    const isFilled = index < allocatedCoins;
                                    const slotKey = `tray-${option.id}-${index}`;
                                    const isHidden = animatingSlots.has(slotKey);

                                    if (isFilled) {
                                        return (
                                            <button
                                                key={slotKey}
                                                ref={(element) => setTraySlotRef(slotKey, element)}
                                                type="button"
                                                onClick={(event) =>
                                                    handleAllocatedCoinClick(event, option.id, index)
                                                }
                                                disabled={isAnimating}
                                                aria-label={`Return ${option.label} coin ${
                                                    index + 1
                                                } to bank`}
                                                className={`flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-bold transition ${
                                                    isHidden
                                                        ? "opacity-0"
                                                        : "border border-amber-500 bg-amber-400 text-amber-950 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.35)] hover:bg-amber-500"
                                                }`}
                                            >
                                                {purposeInitial}
                                            </button>
                                        );
                                    }

                                    return (
                                        <span
                                            key={slotKey}
                                            ref={(element) => setTraySlotRef(slotKey, element)}
                                            aria-label={`${option.label} empty coin slot ${index + 1}`}
                                            className={`flex h-7 w-7 items-center justify-center rounded-full border-2 border-dashed border-gray-300 bg-transparent text-gray-300 transition ${
                                                isHidden ? "opacity-0" : ""
                                            }`}
                                        />
                                    );
                                })}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div
                className={`rounded-2xl border px-4 py-3 text-sm font-semibold ${
                    coinsRemaining === 0
                        ? "border-green-100 bg-green-50 text-green-700"
                        : "border-gray-200 bg-gray-50 text-gray-500"
                }`}
            >
                {coinsRemaining === 0 ? (
                    <span>All coins allocated ✓</span>
                ) : (
                    <span>⚠ {coinsRemaining} coins remaining</span>
                )}
            </div>
        </div>
    );
}
