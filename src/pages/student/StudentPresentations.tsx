import { useSelector } from "react-redux";
import { Presentation as PresentationIcon, CheckCircle2, Clock } from "lucide-react";
import { useGetPresentationsQuery } from "@/features/presentation/presentationApi";
import { useCountdown } from "@/hooks/useCountdown";
import type { RootState } from "@/app/store";
import type { Presentation } from "@/types";

function CountdownDisplay({ presentation }: { presentation: Presentation }) {
  const { days, hours, minutes, seconds, isPast } = useCountdown(
    `${presentation.date}T${presentation.time}`
  );

  if (isPast) {
    return (
      <span className="text-xs font-semibold text-gray-500">Completed</span>
    );
  }

  return (
    <div className="grid grid-cols-4 gap-2 text-center">
      <div className="rounded-xl bg-white/10 p-2 backdrop-blur-md border border-white/10">
        <span className="text-lg font-bold text-cyan-300">{days}</span>
        <span className="block text-[10px] uppercase text-slate-300">Days</span>
      </div>
      <div className="rounded-xl bg-white/10 p-2 backdrop-blur-md border border-white/10">
        <span className="text-lg font-bold text-cyan-300">{hours}</span>
        <span className="block text-[10px] uppercase text-slate-300">Hrs</span>
      </div>
      <div className="rounded-xl bg-white/10 p-2 backdrop-blur-md border border-white/10">
        <span className="text-lg font-bold text-cyan-300">{minutes}</span>
        <span className="block text-[10px] uppercase text-slate-300">Min</span>
      </div>
      <div className="rounded-xl bg-white/10 p-2 backdrop-blur-md border border-white/10">
        <span className="text-lg font-bold text-cyan-300">{seconds}</span>
        <span className="block text-[10px] uppercase text-slate-300">Sec</span>
      </div>
    </div>
  );
}

export default function StudentPresentations() {
  const studentProfileId = useSelector((state: RootState) => state.auth.studentProfile);
  const { data: presentations, isLoading } = useGetPresentationsQuery();

  const myPresentations =
    presentations?.filter((p) => p.studentId === studentProfileId) ?? [];

  const now = new Date();
  const upcoming = myPresentations.filter(
    (p) => new Date(`${p.date}T${p.time}`) > now
  );
  const completed = myPresentations.filter(
    (p) => new Date(`${p.date}T${p.time}`) <= now
  );

  if (isLoading) return <p>Loading presentations...</p>;

  return (
    <div>
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900 via-blue-900 to-slate-900 p-8 text-white shadow-xl">
        <span className="inline-flex items-center rounded-full bg-indigo-500/30 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-200">
          Academic Portal
        </span>
        <h1 className="mt-3 text-3xl font-bold">Student Presentations</h1>
        <p className="mt-1 max-w-xl text-sm text-slate-300">
          Track your scheduled presentations and upcoming deadlines.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="mt-6 grid gap-6 sm:grid-cols-3">
        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Total Topics
            </p>
            <h3 className="mt-2 text-3xl font-extrabold text-slate-800">
              {myPresentations.length}
            </h3>
          </div>
          <div className="rounded-2xl bg-indigo-50 p-4 text-indigo-600 border border-indigo-100">
            <PresentationIcon className="h-6 w-6" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Upcoming
            </p>
            <h3 className="mt-2 text-3xl font-extrabold text-slate-800">
              {upcoming.length}
            </h3>
          </div>
          <div className="rounded-2xl bg-emerald-50 p-4 text-emerald-600 border border-emerald-100">
            <CheckCircle2 className="h-6 w-6" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-200/80 bg-white p-6 shadow-md">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Completed
            </p>
            <h3 className="mt-2 text-3xl font-extrabold text-slate-800">
              {completed.length}
            </h3>
          </div>
          <div className="rounded-2xl bg-amber-50 p-4 text-amber-600 border border-amber-100">
            <Clock className="h-6 w-6" />
          </div>
        </div>
      </div>

      {/* Presentation List */}
      <h2 className="mt-8 text-lg font-semibold text-slate-800">My Presentations</h2>

      {myPresentations.length === 0 ? (
        <p className="mt-4 text-gray-500">
          No presentations assigned yet. Your teacher will assign one soon.
        </p>
      ) : (
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {myPresentations.map((presentation) => (
            <div
              key={presentation._id}
              className="rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-900 to-slate-900 p-6 text-white shadow-xl"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-300">
                {presentation.subject}
              </p>
              <h3 className="mt-1 text-lg font-bold">{presentation.topic}</h3>
              <p className="mt-1 text-xs text-slate-300">
                {presentation.date} at {presentation.time}
              </p>

              <div className="mt-4">
                <CountdownDisplay presentation={presentation} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}