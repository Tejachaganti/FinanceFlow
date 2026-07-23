import { useEffect, useRef, useState } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  Save,
  Loader2,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { toast } from "react-hot-toast";
import api from "../../services/api";

const defaultExpense = {
  title: "",
  amount: "",
  category: "Other",
  merchant: "",
  date: "",
};

const categories = [
  "Food",
  "Transport",
  "Shopping",
  "Entertainment",
  "Bills",
  "Health",
  "Education",
  "Travel",
  "Salary",
  "Other",
];

const VoiceExpenseRecorder = ({ createExpense }) => {
  const recognitionRef = useRef(null);
  const transcriptRef = useRef("");

  const [supported, setSupported] = useState(true);
  const [listening, setListening] = useState(false);
  const [processing, setProcessing] = useState(false);

  const [transcript, setTranscript] = useState("");
  const [expense, setExpense] = useState(defaultExpense);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition ||
      window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setSupported(false);
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-IN";
    recognition.continuous = false;

    // Important: only return the final transcript
    recognition.interimResults = false;

    recognition.maxAlternatives = 1;

    recognition.onresult = (event) => {
      const text = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(" ")
        .trim();

      transcriptRef.current = text;
      setTranscript(text);
    };

    recognition.onend = async () => {
      setListening(false);

      const text = transcriptRef.current.trim();

      if (!text) return;

      try {
        setProcessing(true);

        const { data } = await api.post("/ai/extract-expense", { transcript: text });
        if (!data.success) {
          throw new Error(
            data.message || "Unable to extract expense."
          );
        }

        setExpense({
          title: data.expense.title || "",
          amount: data.expense.amount || "",
          category: data.expense.category || "Other",
          merchant: data.expense.merchant || "",
          date:
            data.expense.date ||
            new Date().toISOString().split("T")[0],
        });

        toast.success("Expense extracted successfully.");
      } catch (error) {
        console.error(error);
        toast.error("Failed to extract expense.");
      } finally {
        setProcessing(false);
      }
    };

    recognition.onerror = () => {
      setListening(false);
      toast.error("Speech recognition failed.");
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (!recognitionRef.current) return;

    transcriptRef.current = "";

    setTranscript("");

    setExpense(defaultExpense);

    setListening(true);

    recognitionRef.current.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
  };

  const clearAll = () => {
    transcriptRef.current = "";

    setTranscript("");

    setExpense(defaultExpense);
  };

  const saveExpense = async () => {
    try {
      const success = await createExpense(expense);
      if (!success) return;

      clearAll();
    } catch (error) {
      console.error(error);
      toast.error("Failed to save expense.");
    }
  };

  return (
    <div className="rounded-3xl border border-slate-700/40 bg-[#131A2A] p-6 shadow-xl">

  {/* Header */}
  <div className="mb-6 flex items-center gap-3">
    <Volume2 className="h-6 w-6 text-cyan-400" />

    <div>
      <h2 className="text-xl font-bold text-white">
        Voice Expense Recorder
      </h2>

      <p className="text-sm text-slate-400">
        Record an expense using your voice and let AI fill the details.
      </p>
    </div>
  </div>

  {!supported ? (
    <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-5 text-red-300">
      Your browser doesn't support Speech Recognition.
    </div>
  ) : (
    <>
      {/* Microphone */}

      <div className="flex flex-col items-center">

        {!listening ? (
          <button
            onClick={startListening}
            disabled={processing}
            className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 shadow-lg transition hover:scale-105 disabled:opacity-50"
          >
            <Mic className="h-10 w-10 text-white" />
          </button>
        ) : (
          <button
            onClick={stopListening}
            className="flex h-24 w-24 animate-pulse items-center justify-center rounded-full bg-red-500 shadow-lg"
          >
            <MicOff className="h-10 w-10 text-white" />
          </button>
        )}

        <p className="mt-5 text-center text-slate-300">

          {listening
            ? "🎤 Listening..."
            : processing
            ? "🤖 AI is analyzing your expense..."
            : "🎙 Tap the microphone and describe your expense"}

        </p>

      </div>

      {/* Transcript */}

      <div className="mt-8">

        <label className="mb-2 block text-sm font-medium text-slate-300">
          Transcript
        </label>

        <div className="min-h-[120px] rounded-2xl border border-slate-700 bg-slate-900/60 p-4">

          {transcript ? (
            <p className="leading-7 text-slate-100">
              {transcript}
            </p>
          ) : (
            <p className="text-slate-500">
              Your speech will appear here...
            </p>
          )}

        </div>

      </div>

      {/* Loading */}

      {processing && (

        <div className="mt-6 flex items-center gap-3 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4">

          <Loader2 className="h-5 w-5 animate-spin text-cyan-400" />

          <span className="text-cyan-300">
            AI is extracting expense details...
          </span>

        </div>

      )}

      {/* Extracted Expense */}

      {expense.amount && (

        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-900/40 p-6">

          <div className="mb-6 flex items-center gap-2">

            <Sparkles className="h-5 w-5 text-cyan-400" />

            <h3 className="text-lg font-semibold text-white">
              AI Extracted Expense
            </h3>

          </div>

          <div className="grid gap-4 md:grid-cols-2">

            <div>

              <label className="mb-2 block text-sm text-slate-400">
                Title
              </label>

              <input
                value={expense.title}
                onChange={(e) =>
                  setExpense({
                    ...expense,
                    title: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm text-slate-400">
                Amount
              </label>

              <input
                type="number"
                value={expense.amount}
                onChange={(e) =>
                  setExpense({
                    ...expense,
                    amount: Number(e.target.value),
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              />

            </div>

            <div>

              <label className="mb-2 block text-sm text-slate-400">
                Category
              </label>

              <select
                value={expense.category}
                onChange={(e) =>
                  setExpense({
                    ...expense,
                    category: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              >

                {categories.map((category) => (

                  <option
                    key={category}
                    value={category}
                  >
                    {category}
                  </option>

                ))}

              </select>

            </div>

            <div>

              <label className="mb-2 block text-sm text-slate-400">
                Merchant
              </label>

              <input
                value={expense.merchant}
                onChange={(e) =>
                  setExpense({
                    ...expense,
                    merchant: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              />

            </div>

            <div className="md:col-span-2">

              <label className="mb-2 block text-sm text-slate-400">
                Date
              </label>

              <input
                type="date"
                value={expense.date}
                onChange={(e) =>
                  setExpense({
                    ...expense,
                    date: e.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-700 bg-slate-800 p-3 text-white"
              />

            </div>

          </div>
                    {/* Action Buttons */}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">

            <button
              type="button"
              onClick={clearAll}
              disabled={processing}
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 px-5 py-3 font-medium text-slate-300 transition hover:border-slate-600 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <RotateCcw className="h-5 w-5" />
              Clear
            </button>

            <button
              type="button"
              onClick={saveExpense}
              disabled={
                processing ||
                !expense.title.trim() ||
                !expense.amount
              }
              className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-3 font-semibold text-white transition hover:scale-[1.02] hover:shadow-lg hover:shadow-cyan-500/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {processing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-5 w-5" />
                  Save Expense
                </>
              )}
            </button>

          </div>

        </div>

      )}

    </>

  )}

</div>
  );
};

export default VoiceExpenseRecorder;
