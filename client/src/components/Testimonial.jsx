import React from 'react';
import Title from './Titles';
import { assets } from '../assets/assets';
import { motion } from 'framer-motion'

const Testimonial = () => {
  const testimonials = [
    {
      name: "Emma Rodriguez",
      location: "Bengaluru, India",
      image: assets.testimonial_image_1,
      rating: 5,
      testimonial:
        "Exceptional service and attention to detail. Everything was handled professionally and efficiently from start to finish. Highly recommended!",
    },
    {
      name: "John",
      location: "New Delhi, India",
      image: assets.testimonial_image_2,
      rating: 5,
      testimonial:
        "Everything from booking to the return was smooth. The car was clean, luxurious, and exactly what I needed. Excellent experience!",
    },
    {
      name: "Rahul",
      location: "Mumbai, India",
      image: assets.testimonial_image_3,
      rating: 5,
      testimonial:
        "Great platform to find luxury cars at affordable prices. Loved the seamless process and friendly support team. Will book again!",
    },
  ];

  return (
    <div className="py-28 px-6 md:px-24 xl:px-44">
      <Title
        title="What our Customers Say"
        subTitle="Discover why discerning travelers choose StrayVenture for their luxury accommodations around the world"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-20">
        {testimonials.map((testimonial, index) => (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.3 }}
            key={index}
            className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500"
          >
            <div className="flex items-center gap-3">
              <img
                className="w-12 h-12 rounded-full object-cover"
                src={testimonial.image}
                alt={testimonial.name}
              />
              <div>
                <p className="text-xl font-medium">{testimonial.name}</p>
                <p className="text-gray-500 text-sm">{testimonial.location}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 mt-4">
              {Array(testimonial.rating)
                .fill(0)
                .map((_, i) => (
                  <img
                    key={i}
                    src={assets.star_icon}
                    alt="star"
                    className="w-4 h-4"
                  />
                ))}
            </div>
            <p className="text-gray-600 max-w-[360px] mt-4 font-light">
              "{testimonial.testimonial}"
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonial;
