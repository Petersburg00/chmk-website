import { getTranslations, setRequestLocale } from "next-intl/server";
import { Linkedin } from "lucide-react";
import SectionLabel from "@/components/SectionLabel";
import { advisor, audit, board, leadership, type TeamMember } from "@/data/team";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "team" });
  return { title: t("label") };
}

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toLocaleUpperCase("tr-TR");
}

function MemberCard({
  member,
  role,
  linkedinLabel,
}: {
  member: TeamMember;
  role: string;
  linkedinLabel: string;
}) {
  return (
    <div className="rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-copper/60">
      {member.photo ? (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={member.photo}
          alt={member.name}
          className="aspect-square w-full rounded-xl object-cover"
        />
      ) : (
        <div className="display flex aspect-square w-full items-center justify-center rounded-xl bg-gradient-to-br from-copper/25 via-olive/20 to-gold/25 text-4xl text-foreground/70">
          {initials(member.name)}
        </div>
      )}
      <div className="mt-4 flex items-start justify-between gap-2">
        <div>
          <h3 className="font-bold leading-snug">{member.name}</h3>
          <p className="mt-0.5 text-xs text-muted">{role}</p>
        </div>
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${member.name}: ${linkedinLabel}`}
            className="mt-0.5 text-muted transition-colors hover:text-copper"
          >
            <Linkedin size={18} />
          </a>
        )}
      </div>
    </div>
  );
}

export default async function TeamPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("team");

  const groups = [
    { title: t("groups.board"), members: board },
    { title: t("groups.audit"), members: audit },
  ];

  return (
    <div className="wrap pb-24 pt-32 md:pt-40">
      <SectionLabel>{t("label")}</SectionLabel>
      <h1 className="display max-w-3xl text-4xl md:text-6xl">{t("title")}</h1>
      <p className="mt-6 max-w-2xl text-muted">{t("intro")}</p>

      {/* Danisman */}
      <section className="mt-16">
        <SectionLabel>{t("groups.advisor")}</SectionLabel>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {advisor.map((member) => (
            <MemberCard
              key={member.name}
              member={member}
              role={t(`roles.${member.roleKey}`)}
              linkedinLabel={t("linkedin")}
            />
          ))}
        </div>
      </section>

      {/* Baskan, baskan yardimcisi, denetim kurulu baskani */}
      <section className="mt-16">
        <SectionLabel>{t("groups.leadership")}</SectionLabel>
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {leadership.map((member) => (
            <MemberCard
              key={member.name}
              member={member}
              role={t(`roles.${member.roleKey}`)}
              linkedinLabel={t("linkedin")}
            />
          ))}
        </div>
      </section>

      {groups.map((group) => (
        <section key={group.title} className="mt-16">
          <SectionLabel>{group.title}</SectionLabel>
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {group.members.map((member) => (
              <MemberCard
                key={member.name}
                member={member}
                role={t(`roles.${member.roleKey}`)}
                linkedinLabel={t("linkedin")}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
