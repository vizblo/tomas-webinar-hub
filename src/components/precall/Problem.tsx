import { SectionHeading } from "./SectionHeading";

export function Problem() {
  return (
    <section className="px-4 py-20">
      <SectionHeading
        eyebrow="Det här känner jag igen"
        title={
          <>
            Du har försökt allt — men <span className="text-gradient-gold">tankarna</span> tar fortfarande över
          </>
        }
      />

      <div className="mx-auto mt-12 max-w-3xl space-y-6 text-lg leading-relaxed text-foreground/90">
        <p>
          Du är en kapabel människa. På utsidan fungerar livet. Men på insidan är det
          en annan historia — katastroftankar som dyker upp ur ingenstans, en känsla av
          att aldrig vara <em>tillräcklig</em>, eller en ständig oro som följer dig genom dagen.
        </p>
        <p>
          Du har läst böcker. Lyssnat på podcasts. Kanske testat terapi, meditation eller
          appar som lovar lugn. En del har hjälpt — men ingenting har riktigt
          <span className="text-gold"> löst </span>
          det.
        </p>
        <p>
          Det <strong>de flesta missar</strong> är att problemet inte ligger i tankarna i sig.
          Det ligger i hur du <em>förhåller dig</em> till dem. Och det är något du
          inte kan läsa dig till — det måste upplevas, ofta i samtal med någon som varit
          där själv och vet exakt vad som faktiskt gör skillnad.
        </p>
        <p className="border-l-2 border-gold pl-6 font-serif text-2xl italic text-foreground">
          “När jag väl insåg hur sinnet faktiskt fungerar, förändrades allting.”
          <span className="mt-2 block text-base not-italic text-muted-foreground">— Tomas</span>
        </p>
      </div>
    </section>
  );
}
