import type { Lang } from "@/lib/weather-data"
import { UI, pick } from "@/lib/i18n"

interface Member {
  name: { th: string; en: string }
  nickname: { th: string; en: string }
  roles: string[]
}

const MEMBERS: Member[] = [
  {
    name: { th: "สหกานต์ธีรา", en: "Sahakanteera" },
    nickname: { th: "ผักกาด", en: "Phakkad" },
    roles: ["S1 Planner", "S2 Coder", "S3 Debugger", "Final Integration Lead"],
  },
  {
    name: { th: "ปิยภัทร", en: "Piyaphat" },
    nickname: { th: "พัตเตอร์", en: "Putter" },
    roles: ["S1 Coder", "S2 Debugger", "S3 Planner", "Final AI Feature Lead"],
  },
  {
    name: { th: "อัษฎาวุธ", en: "Atsadawut" },
    nickname: { th: "กล้า", en: "Kla" },
    roles: ["S1 Debugger", "S2 Planner", "S3 Coder", "Final DevOps Lead"],
  },
]

export function TeamFooter({ lang }: { lang: Lang }) {
  return (
    <footer className="mx-auto mt-2 max-w-6xl px-4 pb-10 sm:px-6">
      <div className="rounded-2xl border border-[#f1f3f4] bg-white p-5 shadow-[0_1px_3px_rgba(0,0,0,0.12)] sm:p-6">
        <h3 className="mb-4 text-sm font-medium text-[#202124]">{pick(UI.team, lang)}</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[420px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#e8eaed] text-left text-xs text-[#5f6368]">
                <th className="py-2 pr-4 font-medium">{lang === "th" ? "ชื่อ" : "Name"}</th>
                <th className="py-2 pr-4 font-medium">{lang === "th" ? "ชื่อเล่น" : "Nickname"}</th>
                <th className="py-2 font-medium">{lang === "th" ? "บทบาท (S1 / S2 / S3)" : "Roles (S1 / S2 / S3)"}</th>
              </tr>
            </thead>
            <tbody>
              {MEMBERS.map((m) => (
                <tr key={m.name.en} className="border-b border-[#f1f3f4] last:border-0">
                  <td className="py-2.5 pr-4 text-[#202124]">{lang === "th" ? m.name.th : m.name.en}</td>
                  <td className="py-2.5 pr-4 text-[#5f6368]">{lang === "th" ? m.nickname.th : m.nickname.en}</td>
                  <td className="py-2.5">
                    <div className="flex flex-wrap gap-1.5">
                      {m.roles.map((r) => (
                        <span
                          key={r}
                          className="rounded-md bg-[#f1f3f4] px-2 py-0.5 text-xs text-[#3c4043]"
                        >
                          {r}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </footer>
  )
}
