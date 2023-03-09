import {Button} from '~components/atoms/Button/button';
import {SafeAreaView} from 'react-native';
export const FormTemplate = () => {
  return (
    <SafeAreaView>
      <Button
        type={'warning'}
        text={'hello'}
        onPress={event => console.log('here')}
      />
      <Button
        type="error"
        text={'hello'}
        onPress={event => console.log('submit form', {event})}
      />
      <Button
        type="success"
        text={'hello'}
        onPress={event => console.log('submit form', {event})}
      />
      <Button
        type="warning"
        isDisabled
        text={'hello'}
        onPress={event => console.log('submit form', {event})}
      />
    </SafeAreaView>
  );
};
