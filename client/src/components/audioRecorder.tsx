import { useEffect, useRef, useState } from "react";

import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const AudioRecorder = () => {
    const [recording, setRecording] = useState<boolean>(false);
    const [audioURL, setAudioURL] = useState<string>("");
    const [volume, setVolume] = useState<number>(0);
    const audioRef = useRef<MediaRecorder | null>(null);
    const mediaStreamRef = useRef<MediaStream | null>(null);
    const animationRef = useRef<number | null>(null);

    const startRecording = () => {
        setAudioURL("");
        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream: MediaStream) => {
                const mediaRecorder = new MediaRecorder(stream);
                const audioContext = new AudioContext();
                const source = audioContext.createMediaStreamSource(stream);
                const analyser = audioContext.createAnalyser();
                source.connect(analyser);

                const updateVolume = () => {
                    const array = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(array);
                    let values = 0;

                    const length = array.length;
                    for (let i = 0; i < length; i++) {
                        values += array[i];
                    }

                    setVolume(values / length);
                    animationRef.current = requestAnimationFrame(updateVolume);
                };

                updateVolume();
                mediaStreamRef.current = stream;
                audioRef.current = mediaRecorder;
                mediaRecorder.start();

                const audioChunks: BlobPart[] = [];
                mediaRecorder.addEventListener("dataavailable", (event) => {
                    audioChunks.push(event.data);
                });

                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks, {
                        type: "audio/wav",
                    });
                    const audioUrl = URL.createObjectURL(audioBlob);
                    setAudioURL(audioUrl);
                    if (animationRef.current) {
                        cancelAnimationFrame(animationRef.current);
                    }
                    mediaStreamRef.current
                        ?.getTracks()
                        .forEach((track) => track.stop());
                });

                setRecording(true);
            })
            .catch((err: Error) => {
                console.error("Error accessing media devices.", err);
            });
    };

    const stopRecording = () => {
        audioRef.current?.stop();
        setRecording(false);
    };

    useEffect(() => {
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
            mediaStreamRef.current
                ?.getTracks()
                .forEach((track) => track.stop());
        };
    }, []);

    return (
        <div className="flex w-full flex-col items-center justify-center gap-2 p-4">
            {recording && (
                <div className="w-full">
                    <label className="text-primary">Input Volume:</label>
                    <div className="w-full rounded-full bg-gray-200">
                        <Progress value={volume} />
                    </div>
                </div>
            )}

            <div className="flex w-full flex-col gap-2">
                {!recording ? (
                    <Button
                        className="w-full bg-green-500"
                        onClick={startRecording}
                    >
                        Start New Recording
                    </Button>
                ) : (
                    <Button
                        className="w-full bg-red-700"
                        onClick={stopRecording}
                    >
                        Stop Recording
                    </Button>
                )}
                {audioURL && (
                    <Button className="w-full">
                        <a href={audioURL} download="recording.wav">
                            Download Recording
                        </a>
                    </Button>
                )}
            </div>
        </div>
    );
};

export default AudioRecorder;
