import { useEffect } from 'react';

interface ImageZoomProps {
    img: string,
    bigImg: string
}
export default function ImageZoom(props: ImageZoomProps) {
    const { img, bigImg } = props;
    useEffect(() => {
        const abbr = document.querySelector('.abbr') as HTMLElement;
        const mark = document.querySelector('.mark') as HTMLElement;
        const details = document.querySelector('.details') as HTMLElement;
        const bigImg = document.querySelector('.big-img') as HTMLElement;

        if (!abbr || !mark || !details || !bigImg) return;

        const abbrInfo = abbr.getBoundingClientRect();
        const abbrWidth = abbrInfo.width;
        const abbrHeight = abbrInfo.height;
        const abbrLeft = abbrInfo.left;
        const abbrTop = abbrInfo.top;



        const detailsInfo = window.getComputedStyle(details);
        const dtlWidth = parseInt(detailsInfo.width);
        const dtlHeight = parseInt(detailsInfo.height);
        const dtlLeft = parseInt(detailsInfo.left);
        const dtlTop = parseInt(detailsInfo.top);

        const markInfo = window.getComputedStyle(mark);
        const markWidth = parseInt(markInfo.width);
        const markHeight = parseInt(markInfo.height);
        const markLeft = parseInt(markInfo.left);
        const markTop = parseInt(markInfo.top);

        const maxLeft = abbrWidth - markWidth;
        const maxTop = abbrHeight - markHeight;

        bigImg.style.width = `${dtlWidth / (markWidth / abbrWidth)}px`;
        bigImg.style.height = `${dtlHeight / (markHeight / abbrHeight)}px`;

        const mouseenter = function mouseenter(ev: MouseEvent) {
            mark.style.display = "block";
            details.style.display = "block";
            console.log(ev);
            let left = (ev.clientX - abbrLeft - markWidth / 2);
            let top = (ev.clientY - abbrTop - markHeight / 2);

            left = left < 0 ? 0 : left > maxLeft ? maxLeft : left;
            top = top < 0 ? 0 : top > maxTop ? maxTop : top;

            mark.style.left = `${left}px`;
            mark.style.top = `${top}px`;

            mark.addEventListener('mousemove', mousemove);
        }

        const mouseleave = function mouseleave(ev: MouseEvent) {
            mark.style.display = "none";
            details.style.display = "none";
            mark.removeEventListener('mousemove', mousemove);
        }

        const mousemove = function mousemove(ev: MouseEvent) {
            let left = (ev.clientX - abbrLeft - markWidth / 2);
            let top = (ev.clientY - abbrTop - markHeight / 2);

            left = left < 0 ? 0 : left > maxLeft ? maxLeft : left;
            top = top < 0 ? 0 : top > maxTop ? maxTop : top;

            mark.style.left = `${left}px`;
            mark.style.top = `${top}px`;

            bigImg.style.left = `-${left / abbrWidth * bigImg.clientWidth}px`;
            bigImg.style.top = `-${top / abbrHeight * bigImg.clientHeight}px`;
        }

        abbr.addEventListener('mouseenter', mouseenter);
        abbr.addEventListener('mouseleave', mouseleave);

        return () => {
            abbr.removeEventListener('mouseenter', mouseenter);
            abbr.removeEventListener('mouseleave', mouseleave);
        };
    }, []);

    return (
        <div className="w-full h-full relative">
            <div className="abbr relative box-border w-[474px] h-[355px] ]">
                <img src={img} className="h-full w-full" />
                <div className="mark hidden absolute box-border w-[150px] h-[100px] border-[1px] border-solid border-red-500 bg-opacity-30 bg-gray-400 cursor-move"></div>
            </div>
            <div className="details hidden absolute left-[474px] top-0 w-[711px] h-[532.5px] overflow-hidden border-[1px] z-10 bg-gray-100">
                <img className="big-img absolute left-0 top-0" src={bigImg} alt="" />
            </div>
        </div>
    );
}