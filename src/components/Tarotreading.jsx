import { useState } from "react";
//make tarot css;

const tarot_reading = {
    "public/tarot/0thefool.jpg": "the fool represents new beginnings and limitless potential. take a leap of faith into the unknown, but beware of recklessness and unintended consequences.",
    "public/tarot/1themagician.jpg": "as above, so below. the magician indicates that you have the right skills to bring your dreams into reality. use willpower and focused intent to make your goals tangible.",
    "public/tarot/2highpriestess.jpg": "the high priestess reflects the unknown. your answer is found by looking within and trusting your gut instincts rather than looking outwardly.",
    "public/tarot/3empress.jpg": "the empress brings fertility, growth, and emotional fulfillment. she calls for you to practice self-compassion and connect with nature. you have more time than you think.",
    "public/tarot/4emperor.jpg": "the emperor represents structure, power, and leadership. he brings disciplined and logical thought rather than emotional instinct.take control, set boundaries, and think pragmatically.",
    "public/tarot/5hierophant.jpg": "a hierophant is an interpreter of sacred mysteries. this card calls for you to follow tradition and obey conventional structures. take the orthodox approach and follow the proven path to stability.",
    "public/tarot/6lovers.jpg": "you face a choice: you must make a decision about an existing relationship, a temptation of the heart, or a choice between partners. don't take this choice lightly.",
    "public/tarot/7chariot.jpg": "the chariot brings victory, determination, and self-control. you will earn a hard-won success through willpower and hard work and focused action.",
    "public/tarot/8strength.jpg": "you have the patience and resilience to overcome challenges through love and gentle persuasion rather than force. you have great power, even during moments of danger and fear.",
    "public/tarot/9hermit.jpg": "are you a virgo, by chance? the hermit brings a period of introspection, soul-searching, and withdrawal from the outer world to find true inner guidance. take some time alone to focus on your personal truth.",
    "public/tarot/10wheel.jpg": "the wheel of fortune is the best card in the deck! this brings good luck, positive karma, and success. the situation is out of your hands. put your trust in fate!",
    "public/tarot/11justice.jpg": "justice, of course, represents the need for objectivity, balance, and taking responsibility for past actions. for better or for worse, this will be resolved with integrity, not bias. good luck...",
    "public/tarot/12hangedman.jpg": "the hanged man knows that he's stuck. upside down, he sees the world from another perspective. sometimes a change in mindset is necessary for progress. sacrifice your immediate desires to gain greater wisdom.",
    "public/tarot/13death.jpg": "close one door to open another. like a snake shedding its skin, let go of old attachments and embrace change.",
    "public/tarot/14temperance.jpg":"temperance brings balance, moderation, and purpose. take a middle path and use a patient, measured approach to attain inner peace and achieve long-term goals.",
    "public/tarot/15devil.jpg" : "not great! you have some self-imposed limitations, and you remain trapped by your unhealthy habits. acknowledge where you have surrendered your personal power and break free from limiting beliefs.",
    "public/tarot/16tower.jpg" : "catastrophe strikes. you face a sudden, unavoidable collapse and must prioritize survival above all. this challenge will bring revelations that are shocking but ultimately liberating.",
    "public/tarot/17star.jpg" : "when the star appears, you are likely to be inspired. the star brings faith, hope, and a sense that you are truly blessed by the universe.",
    "public/tarot/18moon.jpg" : "the moon brings illusion, uncertainty, and anxiety. you face a period of hidden truths: things are not what they appear.",
    "public/tarot/19sun.jpg" : "the sun brings overwhelming positivity, success, radiance, and joy. you are definitely on the right path. enjoy happiness, fun, and warmth.",
    "public/tarot/20judgement.jpg" : "judgement brings a major life pivot. you face a time of awakening and radical self-acceptance. leave behind old habits and rise into your new life stage.",
    "public/tarot/21world.jpg" : "the world brings fulfillment, completion, and wholeness. it encourages celebration of achievements and a period of rest before your next journey."
}

function grabTarot() {
  const keys = Object.keys(tarot_reading);
  const key = keys[Math.floor(Math.random() * keys.length)];

  const name = key.replace("tarot/", "").replace(".jpg", "").replace(/^\d+/, "").replace(/([a-z])([a-z]+)/g, "$1$2");

  return { img: key, text: tarot_reading[key], name };
}

export default function TarotCard() {
      const [card, setCard] = useState(null);

  return (
    <div className="tarot-result">
      <button className="outline tarot-draw-btn" onClick={() => setCard(grabTarot())}>
        draw a card ✦
      </button>
      {card && (
  <>
    <img src={card.img} alt={card.name} />
    <p className="tarot-name">{card.name}</p>
    <p>{card.text}</p>
  </>
)}
    </div>
  );
}


