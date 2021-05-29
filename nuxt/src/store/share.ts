import _window from "@/libraries/window";
import Vue from "@/libraries/vue";

type Share = {
  subject?: string;
  message: string;
  image: string;
  url: string;
}

const shareStore = new Vue({
  name: "ShareStore",
  data: {
    socialDialog: {
      model: false,
      data: {} as Share
    },
    shareText: "",
    shareUrl: "",
    fullSrc: "",
  },
  methods: {
    async share(msg?: string, subject?: string, image?: string, url?: string): Promise<void> {
      console.log("shareStore share");
      msg = msg || "";
      subject = subject || "";
      image = image || "";
      url = url || location.href.split("//")[1];

      let title = document.querySelector("title");
      let message = title ? title.innerText : "";

      // MOBILE BOWSER NATIVE
      console.log("navigator.share", navigator && navigator.share);

      if (navigator && navigator.share) {
        const data: any = {
          title: subject,
          text: message,
          url
        };

        // // https://stackoverflow.com/questions/61250048/how-to-share-a-single-base64-url-image-via-the-web-share-ap
        // const blob = await (await fetch(image)).blob();
        // const file = new File([blob], (title || message) + '.png', { type: blob.type });
        // // const file2 = new File([blob], (title || message) + '.svg', { type: blob.type });
        // // const file3 = new File([blob], (title || message) + '.svg', { type: "image/svg" }); //"image/svg+xml"        
        // // const files = [file, file2, file3];
        // const files = [file]
        // if (navigator && (navigator as any).canShare && (navigator as any).canShare({ files })) {
        //   data.files = files
        // }

        navigator.share(data);
        return;
      }

      // // CORDOVA
      // const socialsharing = _window.plugins ? _window.plugins.socialsharing : null;
      // if (socialsharing) {
      //   socialsharing.share(
      //     subject + " \r\n" + message + " \r\n" + url
      //     // subject,
      //     // image,
      //     // url
      //   );
      //   return;
      // }

      this.socialDialog = {
        model: true,
        data: {
          message,
          image,
          url
        }
      }
    },
  }
});

export default shareStore;