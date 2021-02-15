## Carousel

This component handles the orchestration of the different components. It is smart enough to handle the logic related to the active slide and passes the information to the different child components. But in reality, it's not very smart, because the actual calculations are made in a custom hook (`useCarousel`) that is making use of a [`CarouselService`](../../core/README.md). Please, refer to the service docs for more details.

This component does not know about animations, those are handled by the [SlidesTrack component](../SlidesTrack/README.md).
