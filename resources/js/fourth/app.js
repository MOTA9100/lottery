window.lottery = (names, winner) => {

    const slideShow = document.getElementById('slideshow')
    const fragment = document.createDocumentFragment()
    let slideIndex = 0,
    stopAt = names.length * 3,
    counter = 0,
    interval;

    names.forEach((name, index) => {
        const listItem = document.createElement('li')
        listItem.classList.add('in')
        if (index === 0) {
            listItem.classList.add('current')
        }
        listItem.innerText = name
        fragment.appendChild(listItem)
        if (name === winner) {
            stopAt += index
        }
    })

    slideShow.appendChild(fragment)
    const slides = slideShow.getElementsByTagName('li')

    const slide = () => {
        slideIndex += 1;
        if (slideIndex >= slides.length) {
            slideIndex = 0;
        }

        document.querySelectorAll('.out').forEach((item) => {
            item.className = ''
            item.classList.add('in')
        })

        document.querySelectorAll('.current').forEach((item) => {
            item.className = ''
            item.classList.add('out')
        })

        const currentSlide = slides.item(slideIndex)
        currentSlide.className = ''
        currentSlide.classList.add('current')
        counter += 1;
        if (interval && counter >= stopAt) {
            clearInterval(interval);
        }
    }

    window.onload = () => {
        interval = setInterval(slide, 120);
    }
}
