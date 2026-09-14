import Image from "next/image";

/**
 * A marca, recortada da própria logo (preta e dourada, 1242px): o
 * monograma R no quadrado aberto e o letreiro PICORELLI PREMIUM com a
 * coroa. Como o fundo do site é a mesma noite da logo, entram como são.
 */
export function Monograma({ className = "" }: { className?: string }) {
  return <Image src="/marca/monograma.png" alt="" aria-hidden="true" width={400} height={400} sizes="120px" priority className={className} />;
}

export function Letreiro({ className = "" }: { className?: string }) {
  return <Image src="/marca/letreiro.png" alt="Picorelli Premium" width={900} height={315} sizes="(max-width: 640px) 60vw, 320px" priority className={className} />;
}

/* a assinatura do estúdio, em máscara, pintada pela cor do texto */
export function MarcaEstudio({ altura, className = "" }: { altura: number; className?: string }) {
  return (
    <span
      role="img"
      aria-label="Rafael Razeira Estúdio"
      className={`inline-block shrink-0 bg-current ${className}`}
      style={{
        height: altura,
        width: Math.round(altura * (956 / 519)),
        WebkitMaskImage: "url(/marca/rafael-razeira.png)",
        maskImage: "url(/marca/rafael-razeira.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}
