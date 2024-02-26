from typing import List
import assemblyai as aai
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from dotenv import load_dotenv
from langchain_core.output_parsers import StrOutputParser
from os import getenv

load_dotenv()


def transciber(input_file) -> List[aai.Utterance] | None:
    aai.settings.api_key = getenv("ASSEMBLY_AI_API_KEY")
    config = aai.TranscriptionConfig(speaker_labels=True, speakers_expected=2)
    transcriber = aai.Transcriber()

   
    transcript = transcriber.transcribe(
        input_file,
        config=config
    )
    output_str = ""
    for utterance in transcript.utterances:
        curr_utterance = f"Speaker {utterance.speaker}: {utterance.text}"
        print(curr_utterance)
        output_str += curr_utterance

    return output_str

def summarizer(input: str) -> str:
    llm = ChatOpenAI(openai_api_key=getenv("OPENAI_API_KEY"))
    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a world class transcription summarizer."),
        ("user", "{input}"),
        ("user", "Please summarize the transcript you have recieved making note of anything intresting")
    ])
    output_parser = StrOutputParser()
    chain = prompt | llm | output_parser
    print(chain.invoke({"input": input}))



    


if __name__ == "__main__":
    transcript = transciber("./21 Brutally Honest Lessons About Life - Alex Hormozi (4K)-Gk8EGWoGnEQ.m4a")
    summarizer(transcript)


