import React, { useCallback, useEffect, useRef, useState } from 'react';
import cards from '../../lib/Data';
import Link from 'next/link';

import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType
} from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay'
import ClassNames from 'embla-carousel-class-names'
import {
  NextButton,
  PrevButton,
  usePrevNextButtons
} from './EmblaCarousalArrowButtons';
import { DotButton, useDotButton } from './EmblaCarousalDotButtons';

const TWEEN_FACTOR_BASE = 0.84;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

type PropType = {
  slides: number[];
  options?: EmblaOptionsType;
};

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [
    Autoplay({ playOnInit: true, delay: 3000 })
    // slidesInView: 5, // Display 5 slides at a time
    // loop: true, // Enable looping
    // skipSnaps: false, // Disable snap points
    // draggable: true // Enable dragging
  ]);
  const [isPlaying, setIsPlaying] = useState(true);
  const tweenFactor = useRef(0);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  const toggleAutoplay = useCallback(() => {
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;

    const playOrStop = autoScroll.isPlaying()
      ? autoScroll.stop
      : autoScroll.play;
    playOrStop();
    setIsPlaying(autoScroll.isPlaying());
  }, [emblaApi]);

  useEffect(() => {
    
    const autoScroll = emblaApi?.plugins()?.autoScroll;
    if (!autoScroll) return;
    console.log(autoScroll.isPlaying());
    setIsPlaying(autoScroll.isPlaying());
    emblaApi
      .on('autoScroll:play', () => setIsPlaying(true))
      .on('autoScroll:stop', () => setIsPlaying(false))
      .on('reInit', () => setIsPlaying(false));

  }, [emblaApi]);

  // to get active slide
  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const activeSlideIndex = emblaApi.selectedScrollSnap();
      const slides = Array.from(document.querySelectorAll('.embla__slide'));
      slides.forEach((slide, index) => {
        slide.classList.toggle('active_slide', index === activeSlideIndex);
      });
    };
    emblaApi.on('select', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi]);


  const handleMouseEnter = () => {
    if (!isPlaying) {
      toggleAutoplay();
    }
  };

  const handleMouseLeave = () => {
    if (isPlaying) {
      toggleAutoplay();
    }
  };

  return (
    <div
      className="embla"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {cards.map((card, index) => (
            <div className="embla__slide embla__class-names " key={index}>
              <div className="card text-white bg-gradient flex flex-col gap-4 max-w-[400px] p-4 rounded-xl min-h-[200px] justify-between">
                <h2 className='font-bold text-3xl'>{card.title}</h2>
                <p className='text-lg font-medium'>{card.description}</p>
                <div className='flex items-center justify-end'>
                  <Link href={card.link} className='px-4 py-2 bg-white text-black font-semibold rounded-full'>Open >> </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="embla__controls">
        {/* <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div> */}

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={'embla__dot'.concat(
                index === selectedIndex ? ' embla__dot--selected' : ''
              )}
            />
          ))}
        </div>
        <button className="embla__play" onClick={toggleAutoplay} type="button">
          {isPlaying ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default EmblaCarousel;
