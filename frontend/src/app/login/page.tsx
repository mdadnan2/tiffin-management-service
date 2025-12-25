'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import { auth } from '@/lib/auth';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { UtensilsCrossed, Mail, Lock, Sparkles, Eye, EyeOff, Copy } from 'lucide-react';
import { toast } from 'sonner';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.auth.login(email, password);
      auth.setAuth(data.accessToken, data.refreshToken, data.user);
      toast.success('Welcome back!');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4 overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4, type: "spring", stiffness: 200 }}
            className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent mb-4 shadow-lg"
          >
            <UtensilsCrossed className="h-8 w-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Tiffin Management
          </h1>
          <p className="text-muted-foreground mt-2">Sign in to manage your meals</p>
        </div>

        <Card className="shadow-2xl border-2">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" disabled={loading} className="w-full gap-2">
                {loading ? 'Signing in...' : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    Sign In
                  </>
                )}
              </Button>
            </form>
            
            <div className="mt-6 p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/20">
              <p className="text-base font-semibold text-foreground mb-3 flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                Demo Credentials
              </p>
              <div className="space-y-2.5">
                <div className="bg-background/60 rounded-md p-3 border border-border/50">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Regular User</p>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <p className="text-base font-mono text-foreground">demo@tiffin.com</p>
                    <button onClick={() => copyToClipboard('demo@tiffin.com')} className="p-1 hover:bg-muted rounded">
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-base font-mono text-foreground">demo123</p>
                    <button onClick={() => copyToClipboard('demo123')} className="p-1 hover:bg-muted rounded">
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </div>
                </div>
                <div className="bg-background/60 rounded-md p-3 border border-border/50">
                  <p className="text-xs font-medium text-muted-foreground mb-2">Admin User</p>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <p className="text-base font-mono text-foreground">admin@tiffin.com</p>
                    <button onClick={() => copyToClipboard('admin@tiffin.com')} className="p-1 hover:bg-muted rounded">
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-base font-mono text-foreground">demo123</p>
                    <button onClick={() => copyToClipboard('demo123')} className="p-1 hover:bg-muted rounded">
                      <Copy className="h-3.5 w-3.5 text-muted-foreground" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{' '}
              <Link href="/register" className="text-primary hover:underline font-medium">
                Register
              </Link>
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
