import Vuex from 'vuex';
import { mount, createLocalVue } from '@vue/test-utils';
import mockStore from '@/testUtils/mockStore';
import Router from 'vue-router';
import SideNav from '@/components/shared/SideNav';
import Alert from '@/components/shared/Alert';
import Login from '../Login';

const localVue = createLocalVue();
localVue.use(Router);
localVue.use(Vuex);
const router = new Router();
describe('Login', () => {
  let store;

  beforeEach(() => {
    store = new Vuex.Store(mockStore);
  });

  test('is a Vue instance', () => {
    const wrapper = mount(Login, { store, localVue, router });
    expect(wrapper.isVueInstance()).toBeTruthy();
  });

  test('triggers the login method when submitted', () => {
    const wrapper = mount(Login, { store, localVue, router });
    wrapper.vm.login = jest.fn();
    const email = wrapper.find('#email');
    const password = wrapper.find('#password');
    email.setValue('test@test.com');
    password.setValue('password');
    wrapper.find('form').trigger('submit.prevent');
    expect(wrapper.vm.login).toBeCalled();
  });

  test('opens reset password pane when clicked', () => {
    const wrapper = mount(Login, { store, localVue, router });
    wrapper.find('.button.is-text').trigger('click');
    expect(wrapper.vm.shouldShowReset).toBe(true);
    expect(wrapper.find(SideNav).exists()).toBe(true);
    expect(wrapper.html()).toContain('<span class="title is-size-4">Forgot Password?</span>');
  });

  test('triggers resetPassword method when reset form submitted', () => {
    const wrapper = mount(Login, { store, localVue, router });
    wrapper.vm.resetPassword = jest.fn();
    wrapper.find('.button.is-text').trigger('click');
    wrapper
      .find(SideNav)
      .find('form')
      .trigger('submit.prevent');
    expect(wrapper.vm.resetPassword).toBeCalled();
  });

  test('displays login error when error exists', () => {
    const wrapper = mount(Login, { store, localVue, router });
    wrapper.vm.error = 'This is an error message!';
    const alert = wrapper.find(Alert);
    expect(alert.props().type).toBe('error');
    expect(alert.exists()).toBe(true);
    expect(alert.html()).toContain('This is an error message!');
  });

  test('displays reset password error when error exists', () => {
    const wrapper = mount(Login, { store, localVue, router });
    wrapper.vm.resetError = 'This is an error message!';
    wrapper.find('.button.is-text').trigger('click');
    const alert = wrapper.find(SideNav).find(Alert);
    expect(alert.props().type).toBe('error');
    expect(alert.exists()).toBe(true);
    expect(alert.html()).toContain('This is an error message!');
  });
});
