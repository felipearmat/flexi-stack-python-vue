from django.contrib.auth import mixins

# https://gist.github.com/flyerooo/5ec9034489e0230535f78a93c4502fc0
class TokenLoginRequiredMixin(mixins.LoginRequiredMixin):
    """A login required mixin that allows token authentication."""
    def dispatch(self, request, *args, **kwargs):
        """If token was provided, ignore authenticated status."""
        http_auth = request.META.get("HTTP_AUTHORIZATION")

        if http_auth and "Token" in http_auth:
            pass

        elif not request.user.is_authenticated:
            return self.handle_no_permission()

        return super().dispatch(request, *args, **kwargs)
