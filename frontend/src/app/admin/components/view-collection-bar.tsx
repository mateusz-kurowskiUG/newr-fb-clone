import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import Link from "next/link";
import React from "react";

function ViewCollectionBar() {
  return (
    <div className="bg-black">
      <Carousel>
        <CarouselContent>
          <CarouselItem>
            <Link href="/admin/countries"> Countries</Link>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
}

export default ViewCollectionBar;
