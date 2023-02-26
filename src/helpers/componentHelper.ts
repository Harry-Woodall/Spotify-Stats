const Helpers = {
  // async updateMasonry() {
  //   var images = document.querySelectorAll(".hero-image");
  //   imagesLoaded(images, () => {
  //     new Masonry(".card-grid");
  //   });
  // },
  mapRange(
    number: number,
    in_min: number,
    in_max: number,
    out_min: number,
    out_max: number
  ): number {
    return (
      ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
    );
  },
};

export default Helpers;
