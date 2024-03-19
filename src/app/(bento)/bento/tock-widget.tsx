"use cient"

// import Script from "next/script"

export function TockButton() {
  return (
    <div
      id="Tock_widget_container"
      data-tock-display-mode="Inline"
      data-tock-color-mode="Blue"
      data-tock-locale="en-us"
      data-tock-timezone="America/Chicago"
      data-tock-offering="472593"
    ></div>
  )
}
export const script = `<script>
    !function(t,o,c,k){if(!t.tock){var e=t.tock=function(){e.callMethod?
    e.callMethod.apply(e,arguments):e.queue.push(arguments)};t._tock||(t._tock=e),
    e.push=e,e.loaded=!0,e.version='1.0',e.queue=[];var f=o.createElement(c);f.async=!0,
    f.src=k;var g=o.getElementsByTagName(c)[0];g.parentNode.insertBefore(f,g)}}(
    window,document,'script','https://www.exploretock.com/tock.js');

    tock('init', 'esme-chicago');
    </script>`
