export default (nameList, reelContainerSelector, maxReelItems, onSpinStart, onSpinEnd) => {

    const reelContainer = document.querySelector(reelContainerSelector)
    const reelAnimation = reelContainer?.animate(
        [
            { transform: 'none', filter: 'blur(0)' },
            { filter: 'blur(1px)', offset: 0.5 },
            // Here we transform the reel to move up and stop at the top of last item
            // "(Number of item - 1) * height of reel item" of wheel is the amount of pixel to move up
            // 7.5rem * 16 = 120px, which equals to reel item height
            { transform: `translateY(-${(maxReelItems - 1) * (7.5 * 16)}px)`, filter: 'blur(0)' }
        ],
        {
            duration: maxReelItems * 100, // 100ms for 1 item
            easing: 'ease-in-out',
            iterations: 1
        }
    );

    reelAnimation?.cancel();

    const spin = async () => {
        if (!nameList.length) {
            console.error('Name List is empty. Cannot start spinning.');
            return false;
        }

        typeof onSpinStart === 'function' && onSpinStart()

        if (!reelContainer || !reelAnimation) {
            return false;
        }

        while (nameList.length && nameList.length < maxReelItems) {
            nameList = [...nameList, ...nameList];
        }

        const fragment = document.createDocumentFragment();

        nameList.forEach((name) => {
            const newReelItem = document.createElement('div');
            newReelItem.innerHTML = name;
            fragment.appendChild(newReelItem);
        });

        reelContainer.appendChild(fragment);

        const animationPromise = new Promise((resolve) => {
            reelAnimation.onfinish = resolve;
        });

        reelAnimation.play();

        await animationPromise;

        reelAnimation.finish();

        Array.from(reelContainer.children)
            .slice(0, reelContainer.children.length - 1)
            .forEach((element) => element.remove());

        typeof onSpinEnd === 'function' && onSpinEnd()

        return true;
    }

    return {
        spin
    }
}
