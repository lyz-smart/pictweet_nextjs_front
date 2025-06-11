import { useForm } from 'react-hook-form';

interface TweetForm {
  text: string;
  image: string;
}

interface TweetFormProps {
  initialData: TweetForm;
  errorMessages: string[];
  onSubmit: (data: TweetForm) => void;
}

const TweetForm =  ({ errorMessages, onSubmit, initialData }: TweetFormProps ) => {

  const { register, handleSubmit, formState: { errors } } = useForm<TweetForm>({
    defaultValues: initialData
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMessages.map((error, index) => (
        <div key={index} className="error-message">{error}</div>
      ))}

      {errors.image && <span className="error-message">{errors.image.message}</span>}
      <input
        type="text"
        {...register('image')}
        placeholder="Image Url"
      />

      {errors.text && <span className="error-message">{errors.text.message}</span>}
      <textarea
          {...register('text', { required: "Text can't be blank" })} 
          placeholder="text"
          rows={10}
      />

      <input type="submit" value="SEND" />
    </form>
  );
};

export default TweetForm;